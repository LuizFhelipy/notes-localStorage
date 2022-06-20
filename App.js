import { Picker } from "@react-native-picker/picker"
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota"
import { useEffect, useState } from "react"
import { buscaNotas, buscaNotasFiltro, criaTabela } from "./src/services/Notas"

export default function App() {

  useEffect(() => {
    criaTabela()
    mostraNotas()
  }, [])

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos")
  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])

  async function mostraNotas() {
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }

  async function mostraNotasCategoria(categoria) {
    setCategoriaSelecionada(categoria)
    if(categoria === "Todos"){
      mostraNotas()
    } else {
      const todasNotas = await buscaNotasFiltro(categoria)
      setNotas(todasNotas)
    }
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Picker selectedValue={categoriaSelecionada} onValueChange={novaCategoriaSelecionada => mostraNotasCategoria(novaCategoriaSelecionada)}>
        <Picker.Item label="Todos" value="Todos"/>
        <Picker.Item label="Pessoal" value="Pessoal"/>
        <Picker.Item label="Trabalho" value="Trabalho"/>
        <Picker.Item label="Outros" value="Outros"/>
      </Picker>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota{...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={nota => nota.id}
      />
      <NotaEditor mostraNotasCategoria={mostraNotasCategoria} selecionaCategoria={categoriaSelecionada} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

