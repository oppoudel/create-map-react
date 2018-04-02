import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  List,
  Button,
  Message,
  Input,
} from 'semantic-ui-react';
import Layer from './Layer';
const style = {
  aside: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: 'white',
  },
};
const Layers = ({ layers, toggleSelection }) => {
  const selectedLayersLen = layers.filter(layer => layer.selected).length;
  return (
    <Container style={{ marginTop: '5em' }}>
      <Grid columns={2} stackable>
        <Grid.Column width={12}>
          <Input fluid focus icon="search" placeholder="Search Layer..." />
          <List divided verticalAlign="middle" style={{ marginTop: '2em' }}>
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
            disabled={selectedLayersLen < 1 || selectedLayersLen > 5}>
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
  );
};

export default Layers;
