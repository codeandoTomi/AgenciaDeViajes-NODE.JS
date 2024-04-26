import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => { 
    // CONSULTAR 3 VIAJES DEL MODELO VIAJE..

    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }))
    promiseDB.push(Testimonial.findAll({ limit: 3 }))

    try {
        const resultado = await Promise.all( promiseDB );

        // res.send('nosotros ||  texto enviado...');
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
    });

    } catch (error) {
        console.log(error)
    }

}

const paginaNosotros = (req, res) => { 
    // res.send('nosotros ||  texto enviado...');
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) =>{ 
    // res.send('nosotros ||  texto enviado...');
    // CONSULTANDO BASE DE DATOS..
    const viajes = await Viaje.findAll();
    console.log(viajes)

    res.render('viajes', {
        pagina: 'Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) =>{ 
    // res.send('nosotros ||  texto enviado...');
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
            
        });
    } catch (error) {
        console.log(error)
    }
}

// MUESTRA EL SLUG.
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params

    try {
        const resultado = await Viaje.findOne({ where: { slug: slug } })
        res.render('viaje', {
            pagina: 'Informacion viaje',
            resultado
        })
    } catch(error){
        console.log(error)
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}