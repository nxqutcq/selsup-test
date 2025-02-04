import React from 'react'
import './App.css'

interface Param {
  id: number
  name: string
  type: 'string'
}

interface ParamValue {
  paramId: number
  value: string
}

interface Model {
  paramValues: ParamValue[]
}

interface Props {
  params: Param[]
  model: Model
}

interface State {
  paramValues: { [key: number]: string }
}

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
]

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const paramValues: { [key: number]: string } = {}
    props.model.paramValues.forEach((param) => {
      paramValues[param.paramId] = param.value
    })

    this.state = { paramValues }
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: { ...prevState.paramValues, [paramId]: value },
    }))
  }

  public getModel(): Model {
    return {
      paramValues: Object.entries(this.state.paramValues).map(
        ([paramId, value]) => ({
          paramId: Number(paramId),
          value,
        })
      ),
    }
  }

  render() {
    return (
      <div>
        {this.props.params.map((param) => (
          <div key={param.id} className="param-row">
            <label htmlFor={`param-${param.id}`}>{param.name}:</label>
            <input
              id={`param-${param.id}`}
              type="text"
              value={this.state.paramValues[param.id] || ''}
              onChange={(e) => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    )
  }
}

const App = () => {
  const editorRef = React.useRef<ParamEditor>(null)

  const saveModel = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getModel())
    }
  }

  return (
    <main>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button onClick={saveModel}>Сохранить</button>
    </main>
  )
}

export default App
