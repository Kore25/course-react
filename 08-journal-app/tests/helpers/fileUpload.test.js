import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: 'drlwghgbd',
  api_key: '459499783218117',
  api_secret: 'sx8-EVYs-caVxvYYaqccSsDOcJA',
  secure: true,
})

describe('Pruebas en fileUpload', () => {

  test('debe de subir el archivo correctamente a cloudinary', async() => {
    const imageUrl = 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg';
    const resp = await fetch( imageUrl );
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload( file );
    expect( typeof url ).toBe('string');

    const segments = url.split('/');
    const imageId = segments[ segments.length - 1].replace('.jpg', '');
    const cloudResponse = await cloudinary.api.delete_resources(['journal/' + imageId]);
    // console.log({ cloudResponse });
  });

  test('debe de retornar null', async () => {
    const file = new File([], 'foto.jpg');
    const url = await fileUpload( file );
    expect( url ).toBe(null);
  });


});