const Information = () => {
  return (
    <div className="container">
      <div
        className="hero"
        style={{
          backgroundImage: `url('/assets/map.png')`,
        }}
      >
        <h1>CONTACTO</h1>
        <img className="icon-contact" src="/assets/marcador.png" alt="..."/>
      </div>

      <div className="iconCardsContainer">
        <div className="iconCard">
          <img src="/assets/icono-telefono.png"alt="..." />
          <h3>Teléfono</h3>
          <h3> +54 9 351 802 2424</h3>
        </div>
        <div className="iconCard">
        <a href='https://www.google.com/maps/place/Av.+Col%C3%B3n+150,+X5000+EPO,+C%C3%B3rdoba/@-31.4129845,-64.1871104,17z/data=!3m1!4b1!4m5!3m4!1s0x9432a28298e9d4c7:0xb601abfe6d32062a!8m2!3d-31.4129845!4d-64.1849217' target='_blank' rel='noreferrer'> <img id="buttonSign" src="/assets/icono-map.png" alt="map"/></a>
          <h3>Dirección</h3>
          <h3>Av Colón 150</h3>
          <h3>Córdoba - Capital</h3>
        </div>
        <div className="iconCard">
          <img src="/assets/icono-reloj.png" alt="..."/>
          <h3>Lunes a Viernes</h3>
          <h3>9:00 a 17:30hs.</h3>
        </div>
        <div className="form-consulta">
        <div className="inputs">
          <h2> Envianos tu consulta:</h2>
          <input type="email" placeholder="E-mail" />
          <input type="text" placeholder="Nombre" />
          <textarea className="textarea" type="text" placeholder="Escribe tu consulta.." />
          <button>Enviar</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
