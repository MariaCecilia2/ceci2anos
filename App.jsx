
import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ nome: '', acompanhantes: '', restricoes: '', foto: null });
  const [presencaConfirmada, setPresencaConfirmada] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://script.google.com/macros/s/AKfycbwManV1rRpJhyOcspLbL88HLjI4HEJMWHIpkz5LFMOPb0XV-zeyJNAUj5e4qoQQkwfp/exec", {
      method: "POST",
      body: JSON.stringify({
        nome: formData.nome,
        acompanhantes: formData.acompanhantes,
        restricoes: formData.restricoes,
        foto: formData.foto ? formData.foto.name : ""
      })
    })
    .then(() => setPresencaConfirmada(true))
    .catch(() => alert("Erro ao enviar. Tente novamente."));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#B75BAF' }}>Aniversário da Ceci 🎉</h1>
      <p style={{ textAlign: 'center' }}>Dia 07 de setembro às 15h<br/>Local: Espaço Encanto, Camboriú - SC</p>
      <p style={{ textAlign: 'center', color: '#B75BAF', fontWeight: 'bold' }}>
        Confirme sua presença e venha comemorar com a gente!
      </p>

      {presencaConfirmada ? (
        <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>Obrigada por confirmar presença! 💙</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input name="nome" placeholder="Seu nome" onChange={handleInputChange} required />
          <input name="acompanhantes" placeholder="Número de acompanhantes" onChange={handleInputChange} required />
          <textarea name="restricoes" placeholder="Alguma restrição alimentar?" onChange={handleInputChange} />
          <input type="file" name="foto" accept="image/*" onChange={handleInputChange} />
          <button type="submit">Confirmar Presença</button>
        </form>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h2>🎁 Lista de Presentes</h2>
      <ul>
        <li><a href="https://www.amazon.com.br" target="_blank">Casinha de Boneca – Amazon</a></li>
        <li><a href="https://www.magazineluiza.com.br" target="_blank">Brinquedo Educativo – Magalu</a></li>
        <li>Contribuição via Pix: <strong>(chavepix@email.com)</strong></li>
      </ul>

      <hr style={{ margin: '30px 0' }} />

      <h2>📸 Galeria</h2>
      <p>Confira alguns momentos especiais da Ceci 💜</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <img src="https://via.placeholder.com/150" alt="Ceci sorrindo" style={{ borderRadius: 10 }} />
        <img src="https://via.placeholder.com/150" alt="Ceci brincando" style={{ borderRadius: 10 }} />
      </div>
      <audio controls autoPlay loop style={{ marginTop: 20 }}>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
        Seu navegador não suporta áudio.
      </audio>
    </div>
  );
}
