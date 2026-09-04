'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BranchId, isBranchId, BRANCHES, Branch } from '@/lib/branches';
import { BRANCH_COOKIE, BRANCH_COOKIE_MAX_AGE } from '@/lib/branch-cookie';
import { track } from '@/lib/analytics';

interface BranchContextType {
  branch: BranchId | null;
  activeBranchData: Branch | null;
  /** True when the branch comes from the route (/banani, /banasree) and cannot be switched in place. */
  isPinned: boolean;
  setBranch: (id: BranchId, source?: string) => void;
  clearBranch: () => void;
  isPickerOpen: boolean;
  openPicker: (pendingCallback?: (selected: BranchId) => void) => void;
  closePicker: () => void;
  executePendingAction: (selected: BranchId) => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

/** Route → branch. Precedence step 1, and the strongest signal. */
function branchFromPath(pathname: string | null): BranchId | null {
  if (!pathname) return null;
  if (pathname === '/banani' || pathname.startsWith('/banani/')) return 'banani';
  if (pathname === '/banasree' || pathname.startsWith('/banasree/')) return 'banasree';
  return null;
}

/**
 * Reads ?branch= and promotes it. Isolated in its own component and wrapped in
 * <Suspense> below because useSearchParams() opts its whole subtree out of
 * static rendering — keeping it here means only this leaf is affected, not the
 * entire application.
 */
function BranchParamSync({ onBranch }: { onBranch: (id: BranchId) => void }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handled = useRef<string | null>(null);

  useEffect(() => {
    const raw = searchParams.get('branch');
    if (!raw || !isBranchId(raw)) return;
    const key = `${pathname}?${raw}`;
    if (handled.current === key) return;
    handled.current = key;

    onBranch(raw);

    // Strip the param so the URL stays canonical and shareable.
    const next = new URLSearchParams(searchParams.toString());
    next.delete('branch');
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [searchParams, pathname, router, onBranch]);

  return null;
}

export function BranchProvider({
  initialBranch,
  children,
}: {
  initialBranch: BranchId | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const routeBranch = branchFromPath(pathname);

  const [cookieBranch, setCookieBranch] = useState<BranchId | null>(initialBranch);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pendingRef = useRef<((b: BranchId) => void) | null>(null);

  /* Precedence: route > ?branch= (promoted into cookieBranch) > cookie > null. */
  const branch = routeBranch ?? cookieBranch;
  const isPinned = routeBranch !== null;

  const persist = useCallback((id: BranchId) => {
    document.cookie =
      `${BRANCH_COOKIE}=${id}; path=/; max-age=${BRANCH_COOKIE_MAX_AGE}; SameSite=Lax`;
  }, []);

  const setBranch = useCallback(
    (id: BranchId, source = 'user_action') => {
      setCookieBranch((prev) => {
        if (prev && prev !== id) track('branch_switch', { branch: id, from: prev, source });
        else if (!prev) track('branch_select', { branch: id, source });
        return id;
      });
      persist(id);
    },
    [persist]
  );

  const clearBranch = useCallback(() => {
    setCookieBranch(null);
    document.cookie = `${BRANCH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  }, []);

  /* Visiting a branch page pins that branch and remembers it for later pages. */
  useEffect(() => {
    if (routeBranch && routeBranch !== cookieBranch) {
      setCookieBranch(routeBranch);
      persist(routeBranch);
      track('branch_select', { branch: routeBranch, source: 'route' });
    }
  }, [routeBranch, cookieBranch, persist]);

  /* Keep <html data-branch> in step so tokens.css swaps the accent.
     Scroll position is untouched — this never navigates. */
  useEffect(() => {
    const el = document.documentElement;
    if (branch) el.setAttribute('data-branch', branch);
    else el.removeAttribute('data-branch');
  }, [branch]);

  const openPicker = useCallback((cb?: (selected: BranchId) => void) => {
    pendingRef.current = cb ?? null;
    setIsPickerOpen(true);
  }, []);

  const closePicker = useCallback(() => {
    pendingRef.current = null;
    setIsPickerOpen(false);
  }, []);

  const executePendingAction = useCallback(
    (selected: BranchId) => {
      setBranch(selected, 'picker');
      setIsPickerOpen(false);
      const cb = pendingRef.current;
      pendingRef.current = null;
      // Run after the sheet has closed so a popup is still tied to the gesture.
      if (cb) cb(selected);
    },
    [setBranch]
  );

  const onParamBranch = useCallback(
    (id: BranchId) => setBranch(id, 'query_param'),
    [setBranch]
  );

  return (
    <BranchContext.Provider
      value={{
        branch,
        activeBranchData: branch ? BRANCHES[branch] : null,
        isPinned,
        setBranch,
        clearBranch,
        isPickerOpen,
        openPicker,
        closePicker,
        executePendingAction,
      }}
    >
      <Suspense fallback={null}>
        <BranchParamSync onBranch={onParamBranch} />
      </Suspense>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (!context) throw new Error('useBranch must be used within a BranchProvider');
  return context;
}
