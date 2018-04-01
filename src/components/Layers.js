import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, List, Button, Message } from 'semantic-ui-react'
import Layer from './Layer'
const style = {
  aside: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
    color: 'white'
  }
}

const Layers = ({ layers, toggleSelection }) => {
  const selectedLayersLen = layers.filter(layer => layer.selected).length
  return (
    <Container>
      <Grid columns={2} stackable>
        <Grid.Column width={12}>
          <List divided verticalAlign="middle">
            {layers.map(({ id, title, selected }) => (
              <Layer
                id={id}
                title={title}
                selected={selected}
                toggleSelection={toggleSelection}
                key={id}
              />
            ))}
          </List>
        </Grid.Column>
        <Grid.Column width={4} style={style.aside}>
          <Button
            positive
            size="big"
            disabled={selectedLayersLen < 1 || selectedLayersLen > 5}
          >
            <Link to="/map" style={style.link}>
              Create Map
            </Link>
          </Button>
          {selectedLayersLen > 5 && (
            <Message warning>Please select only upto five layers</Message>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default Layers
