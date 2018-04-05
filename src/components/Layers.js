import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  List,
  Button,
  Message,
  Input,
  Transition,
} from 'semantic-ui-react';
import Header from './Header';
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
const Layers = ({
  layers,
  toggleSelection,
  onSelectInputChange,
  searchTerm,
  mapId,
}) => {
  const selectedLayersLen = layers.filter(layer => layer.selected).length;
  const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <Fragment>
      <Header>
        <h3>Create Map</h3>
      </Header>
      <Container style={{ marginTop: '5em' }}>
        <Grid columns={2} stackable>
          <Grid.Column width={12}>
            <Input
              fluid
              focus
              icon="search"
              placeholder="Search Layer..."
              onChange={onSelectInputChange}
            />
            <Transition.Group
              as={List}
              duration={200}
              animation="fade up"
              divided
              verticalAlign="middle"
              style={{ marginTop: '2em' }}>
              {layers
                .filter(isSearched(searchTerm))
                .map(({ id, title, selected }) => (
                  <Layer
                    id={id}
                    title={title}
                    selected={selected}
                    toggleSelection={toggleSelection}
                    key={id}
                  />
                ))}
            </Transition.Group>
          </Grid.Column>
          <Grid.Column width={4} style={style.aside}>
            <Button
              positive
              size="big"
              disabled={selectedLayersLen < 1 || selectedLayersLen > 5}>
              <Link to={`/map/${mapId}`} style={style.link}>
                Create Map
              </Link>
            </Button>
            {selectedLayersLen > 5 && (
              <Message warning>Please select only upto five layers</Message>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Layers;
