import './App.css';
import data from './data/data';
import { useState } from 'react';

function App() {
  const [response, setResponse] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryArrayQuestion, setCategoryArrayQuestion] = useState([]);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0)
  const [nombreQuestion, setNombreQuestion] = useState(0)

  const getRandomInt = (length) => {
    return Math.floor(Math.random() * length);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    RandomthematicQuestion(e.target.value);
  };

  const RandomthematicQuestion = (selectedCategory) => {
    const categoryArray = data.filter((element) => element.theme === selectedCategory);
    setCategoryArrayQuestion(categoryArray);
  };

  const getQuestion = () => {
    if (category) {
      const randomNumber = getRandomInt(categoryArrayQuestion.length);
      const randomQuestion = categoryArrayQuestion[randomNumber];
      setQuestion(randomQuestion);
    } else {
      const randomNumber = getRandomInt(data.length);
      const randomQuestion = data[randomNumber];
      setQuestion(randomQuestion);
    }
    setResponse(false);
  };

  const uniqueThemes = Array.from(new Set(data.map(element => element.theme)))

  const getScore = (e) => {
    setNombreQuestion(nombreQuestion + 1)
    if(e.target.textContent === "OUI") {
      setScore(score + 1)
      getQuestion()
    } else {
      getQuestion()
    } 
  }

  return (
    <div className='app'>
      <header>
      <select onChange={handleChangeCategory} name="theme" id="">
          <option value="">Select a category</option>
          {uniqueThemes.map((theme) => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </select>
      </header>
     <button className='button-start' onClick={getQuestion}>Nouvelle question</button>
     <p className='score'>Score : {score}/{nombreQuestion}</p>
      {question && (
        <section>
          <h2>{category ? `Thématique ${category}` : "Toutes les thématiques"}</h2>
          <p>{question.question}</p>
          <button onClick={() => setResponse(true)}>Voir la réponse</button>
          {response && <div>
            <p>{question.answer}</p>
            <p>Aviez vous la bonne réponse ?</p>
            <div className='button-answer'>
              <button onClick={getScore}>OUI</button>
              <button onClick={getScore}>NON</button>
            </div>
            
            </div>}
        </section>
      )}
      
    </div>
  );
}

export default App;
