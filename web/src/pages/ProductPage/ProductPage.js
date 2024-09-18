import { useEffect, useState } from "react";

function ProductPage() {
  const [imageUrl, setImageUrl] = useState('');
 
  // Hàm này gọi API để lấy ảnh
  const fetchImage = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/admin`,{
        method: "POST"})
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const url = URL.createObjectURL(await response.blob());
      setImageUrl(url); // Lưu URL của hình ảnh
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
 
  useEffect(() => {
    // Giả sử filename là tên file bạn muốn lấy
    const filename = 'example.jpg'; // Thay đổi thành tên file thực tế
    fetchImage(filename);
  }, []);
 
  return (
    <div>
      <h3>Image from Backend</h3>
      {imageUrl ? (
        <img src={imageUrl} alt="Fetched from backend" style={{ width: '150px' }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
 

export default ProductPage;
