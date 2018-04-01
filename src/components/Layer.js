import React from 'react'
import { Button, List, Header } from 'semantic-ui-react'

const Layer = ({ id, title, selected, toggleSelection }) => {
  const buttonStyle = selected
    ? { color: 'red', text: 'Remove Layer' }
    : { color: 'blue', text: 'Add Layer' }
  return (
    <List.Item>
      <List.Content floated="right">
        <Button color={buttonStyle.color} onClick={() => toggleSelection(id)}>
          {buttonStyle.text}
        </Button>
      </List.Content>
      <List.Content>
        <Header as="h4">{title}</Header>
      </List.Content>
    </List.Item>
  )
}

export default Layer
