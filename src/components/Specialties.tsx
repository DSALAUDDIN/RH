'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './Specialties.css';

import imagingImg from '../assets/specialties/imaging.png';
import bracesImg from '../assets/specialties/braces_clean.png';
import zirconiaImg from '../assets/specialties/zirconia.png';
import implantImg from '../assets/specialties/implant.png';
import rootCanalImg from '../assets/specialties/rootcanal_clean.png';
import gumCareImg from '../assets/specialties/gum_clean.png';
import kidsCareImg from '../assets/specialties/kids_clean.png';

const clinicsBanners = [
	{
		title: 'Precision 3D Dental Imaging',
		desc: 'The future of dentistry is here. Experience ultra-accurate 360° diagnostics with 90% less radiation than traditional methods. Perfection starts with precision.',
		image: imagingImg,
		category: 'Elite Diagnostics',
		featured: true,
		slug: '3d-imaging',
	},
	{
		title: 'Orthodontic Braces',
		desc: 'Align your smile with modern ceramic and invisible solutions. Expert orthodontic care for all ages with lasting, beautiful results.',
		image: bracesImg,
		category: 'Orthodontics',
		featured: false,
		slug: 'braces',
	},
	{
		title: 'Zirconia Restoration',
		desc: 'The ultimate biocompatible material for natural-looking strength and flawless aesthetics. Experience the gold standard in dental crowns.',
		image: zirconiaImg,
		category: 'Prosthetics',
		featured: false,
		slug: 'zirconia',
	},
	{
		title: 'Advanced Implantology',
		desc: 'Permanent solutions for missing teeth with precision-guided implant surgery and high-end prosthetic integration.',
		image: implantImg,
		category: 'Surgical Care',
		featured: false,
		slug: 'implants',
	},
	{
		title: 'Painless Root Canal',
		desc: 'Elite endodontic therapy using the latest microscopic technology for a completely stress-free and effective treatment.',
		image: rootCanalImg,
		category: 'Endodontics',
		featured: false,
		slug: 'root-canal',
	},
	{
		title: 'Healthy Gums, Healthy Smile',
		desc: 'Advanced periodontal care to treat gum diseases and protect your oral health for the long term.',
		image: gumCareImg,
		category: 'Periodontics',
		featured: false,
		slug: 'gum-care',
	},
	{
		title: 'Kids Dental Care',
		desc: 'Making dental visits fun, friendly, and fear-free for your child in a safe environment.',
		image: kidsCareImg,
		category: 'Pedodontics',
		featured: false,
		slug: 'kids-care',
	},
];

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.2 },
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 40, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: 'spring', stiffness: 70, damping: 15 },
	},
};

export default function Specialties() {
	return (
		<section className="specialties-section">
			{/* Soft glow at the dark→light transition zone */}
			<div className="spec-glow" />

			<div className="specialties-inner">
				{/* Header — sits in the dark zone, uses white text */}
				<motion.div
					className="section-header"
					initial={{ opacity: 0, y: 60 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 1, ease: 'easeOut' }}
				>
					<span className="tag">Signature Experience</span>
					<h2>Top-Ranked Dental Clinic in Dhaka</h2>
					<p>
						RH Dental Care provides world-class dental treatments in Bangladesh – including dental implants, braces, and painless root canals tailored to your smile.
					</p>
				</motion.div>

				{/* Bento grid */}
				<motion.div
					className="specialties-showcase"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-50px' }}
				>
					{clinicsBanners.map((card) => (
						<motion.div
							key={card.title}
							className={`premium-card ${card.featured ? 'featured' : 'standard'}`}
							variants={itemVariants}
						>
							{/* Image — full-width cover, part of card, subtle overlay */}
							<div className="card-img-wrapper">
								<Image
									src={card.image}
									alt={`${card.title} - Dental Treatment at RH Dental Care Dhaka`}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
									className="card-img"
									style={{ objectFit: 'cover' }}
								/>
								<div className="card-overlay" />
							</div>

						<div className="card-body">
							<span className="card-tag">{card.category}</span>
							<h3>{card.title}</h3>
							<p>{card.desc}</p>
							<Link href={`/specialties/${card.slug}`} className="view-link">
								<span>View Treatment Detail</span>
								<ArrowRight size={16} className="arrow" />
							</Link>
						</div>
						</motion.div>
					))}
				</motion.div>

				{/* Footer CTA — sits on the near-white zone */}
				<motion.div
				className="section-footer"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.5 }}
			>
				<Link href="/treatments" className="explore-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
					Explore All Treatments
					<ArrowRight size={20} />
				</Link>
			</motion.div>
			</div>
		</section>
	);
}
