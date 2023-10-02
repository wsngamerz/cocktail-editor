import React from 'react'
import { usePicker } from '../context'

const Presets = ({ presets = [] }: { presets: string[] | undefined }) => {
  const { value, onChange, handleChange } = usePicker()

  const getPresets = () => {
    if (presets?.length > 0) {
      return presets?.slice(0, 14)
    } else {
      return fakePresets
    }
  }

  const handlePresetClick = (preset: string) => {
    if (preset?.includes('gradient')) {
      onChange(preset)
    } else {
      handleChange(preset)
    }
  }

  return (
    <div className="grow flex flex-col gap-2">
      <div
        className="w-full aspect-square rounded"
        style={{
          background: value,
        }}
      />
      <div
        className="grid grid-cols-2 gap-1"
      >
        {getPresets().map((p, key) => (
          <div
            key={key}
            className="w-full aspect-square rounded"
            style={{
              background: p,
              border: p === 'rgba(255,255,255, 1)' ? '1px solid #96959c' : '',
            }}
            onClick={() => handlePresetClick(p)}
          />
        ))}
      </div>
    </div>
  )
}

export default Presets

const fakePresets = [
  'rgba(0,0,128,1)',
  'rgba(0,0,255,1)',
  'rgba(0,255,255, 1)',
  'rgba(0,128,0,1)',
  'rgba(128,128,0, 1)',
  'rgba(0,128,128,1)',
  'rgba(0,255,0, 1)',
  'rgba(128,0,0, 1)',
  'rgba(128,0,128, 1)',
  'rgba(175, 51, 242, 1)',
  'rgba(255,0,255, 1)',
  'rgba(255,0,0, 1)',
  'rgba(240, 103, 46, 1)',
  'rgba(255,255,0, 1)',
]
