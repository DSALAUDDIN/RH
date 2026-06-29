from rembg import remove
from PIL import Image
import io

input_path = r"C:\Users\alauddin.mazumder.x\OneDrive - Akij Venture Ltd\Desktop\alauddin\RH\public\assets\dr_shimia.jpeg"
output_path = r"C:\Users\alauddin.mazumder.x\OneDrive - Akij Venture Ltd\Desktop\alauddin\RH\public\assets\dr_shimia_nobg.png"

try:
    with open(input_path, 'rb') as i:
        input_image = i.read()
    
    print("Removing background...")
    output_image = remove(input_image)
    
    with open(output_path, 'wb') as o:
        o.write(output_image)
    print("Successfully saved transparent image to", output_path)
except Exception as e:
    print("Error:", e)
