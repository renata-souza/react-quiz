import { useState } from 'react';
import style from '../styles/Home.module.css'
import Radio from './Form/Radio';

const perguntas = [
  {
    pergunta: 'Qual método é utilizado para criar componentes?',
    options: [
      'React.makeComponent()',
      'React.createComponent()',
      'React.createElement()',
    ],
    resposta: 'React.createElement()',
    id: 'p1',
  },
  {
    pergunta: 'Como importamos um componente externo?',
    options: [
      'import Component from "./Component"',
      'require("./Component")',
      'import "./Component"',
    ],
    resposta: 'import Component from "./Component"',
    id: 'p2',
  },
  {
    pergunta: 'Qual hook não é nativo?',
    options: ['useEffect()', 'useFetch()', 'useCallback()'],
    resposta: 'useFetch()',
    id: 'p3',
  },
  {
    pergunta: 'Qual palavra deve ser utilizada para criarmos um hook?',
    options: ['set', 'get', 'use'],
    resposta: 'use',
    id: 'p4',
  },
];

export default function Home() {
  const [ respostas, setRespostas ] = useState({
    p1: '',
    p2: '',
    p3: '',
    p4: '',
  })
  const [ resultado, setResultado ] = useState(null)
  const [ slide, setSlide ] = useState(0)

  const resultadoFinal = () => {
    const respostasCorretas = perguntas.filter(
      ({id, resposta}) => respostas[id] === resposta
    )
    setResultado(`Voce acertou ${respostasCorretas.length} de ${perguntas.length}.`)
    console.log(respostasCorretas)
  }

  const anterior = () => {
    if (slide > 0) {
      setSlide(slide - 1)
    }
    else {
      setSlide(0)
    }
  }

  const proxima = () => {
    if (slide < perguntas.length -1) {
      setSlide(slide + 1)
    }
    else {
      setSlide(slide + 1)
      resultadoFinal()
    }
  }

  const handleChange = ({target}) => {
    console.log(target)
    setRespostas({...respostas, [target.id]: target.value})
  }

  return (
    <form className={style.form} onSubmit={(event) => event.preventDefault()}>
      {perguntas.map((pergunta, index) => (
        <Radio 
          onChange={handleChange} 
          value={respostas[pergunta.id]} 
          active={slide === index}
          key={pergunta.id}
          {...pergunta}
        />
      ))}
      {slide < perguntas.length && <button onClick={proxima}>{slide === perguntas.length - 1 ? `Finalizar` : `Proxima`}</button>}
      {slide > 0 && slide < perguntas.length && <button onClick={anterior} className={style.anterior}>Anterior</button>}
      {resultado && (
        <>
          <p>Resultado: {resultado}</p>
          <button onClick={() => location.reload()}>Refazer quiz</button>
        </>
      )}
    </form>
  )
}
