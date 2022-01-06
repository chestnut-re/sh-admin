import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import RichTextEditor, { createValueFromString } from 'react-rte'

interface Props {
  value?: any
  onChange?: (value: any) => void
}

const RichInput: React.ForwardRefRenderFunction<any, any> = ({ value, onChange }, ref) => {
  const [richValue, setRichValue] = React.useState(() => RichTextEditor.createEmptyValue())

  useEffect(() => {
    // if (value) {
    //   setRichValue(createValueFromString(value, 'html'))
    // }
  }, [value])


  useEffect(() => {
    onChange?.(richValue.toString('html'))
  }, [richValue])

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
  }))

  const getValue = () => {
    return richValue
  }

  const setValue = (value) => {
    setRichValue(createValueFromString(value, 'html'))
  }

  return <RichTextEditor value={richValue} onChange={setRichValue} />
}

export default forwardRef(RichInput)
