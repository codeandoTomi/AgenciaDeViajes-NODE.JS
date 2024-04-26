import { Testimonial } from '../models/Testimoniales.js';


const guardarTestimoniales = async (req, res) => {
    // console.log(req.body)
    // validar
    const { nombre, correo, mensaje} = req.body;
    const errores = [];
    if(nombre.trim() === ''){
        errores.push({ mensaje : 'El Nombre esta vacio..'});
    }
    if(correo.trim() === ''){
        errores.push({ mensaje : 'El Correo esta vacio..'});
    }
    if(mensaje.trim() === ''){
        errores.push({ mensaje : 'El Mensaje esta vacio..'});
    }
    // console.log(errores)
    if(errores.length > 0){
        //CONSULTAR TESTIMONIALES EXISTENTES.
        const testimoniales = await Testimonial.findAll();

        // MOSTRAR LA VISTA CON ERRORES.
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else{
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimoniales
}