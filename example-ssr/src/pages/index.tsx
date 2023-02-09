import { AutomataGrid, conwaysGameOfLifePreset } from 'cellular-automata-react'

export default function Home() {
  return (
    <>
    <main>
      <AutomataGrid
        rules={conwaysGameOfLifePreset}
        size={{
          xWidth: 4,
          yWidth: 4
        }}
        pixelsActive={[[1,1]]}
        iterationTimeInMs={1000}
      />
    </main>
    </>
  )
}
