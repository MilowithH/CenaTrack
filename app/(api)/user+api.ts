import { neon } from '@neondatabase/serverless';


// const posts = await sql('SELECT * FROM posts');

// See https://neon.com/docs/serverless/serverless-driver
// for more information


// Función para manejar la solicitud POST para crear un nuevo usuario
export async function POST(request : Request) {
    // Conexión a la base de datos usando la URL de conexión almacenada en las variables de entorno
    try{
    const sql = neon(`${process.env.DATABASE_URL}`);
    // Extracción de los datos del cuerpo de la solicitud
    const {name, email, clerkId} = await request.json();

    if (!name || !email || !clerkId) {  

        return Response.json(

            {error: 'Se requieren todos los campos llenos' },
            {status: 400}
        )
    }

    const response= await sql `
    
    INSERT INTO users (
    name, 
    email, 
    clerk_id
    )
    VALUES (
        ${name}, 
        ${email}, 
        ${clerkId}
    )
    `;
// Retorno de una respuesta JSON con los datos insertados y un estado 201 (creado)
return new Response(JSON.stringify({data: response}),
{status: 201}
);


} catch (error : any){
// Manejo de errores y retorno de una respuesta JSON con el mensaje de error y un estado 500 (error interno del servidor)
    console.log(error);
    return Response.json({error:error}, {status: 500});
}

};

