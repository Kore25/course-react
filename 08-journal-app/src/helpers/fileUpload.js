export const fileUpload = async(file) => {
  try {
    if (!file) return null;
    const cloudUrl = 'https://api.cloudinary.com/v1_1/drlwghgbd/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    const resp = await fetch( cloudUrl, {
      method: 'POST',
      body: formData,
    });
    if( !resp.ok ) throw new Error('No se pudo subír imagen');

    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    // console.error(error);
    // throw new Error(error.message);
    return null;
  }
}