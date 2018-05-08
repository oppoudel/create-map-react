import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Dimmer,
  Grid,
  Input,
  List,
  Loader,
  Menu,
  Message,
  Transition,
} from 'semantic-ui-react';
import { Consumer } from '../AppContext';
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
const Layers = () => {
  return (
    <Consumer>
      {({
        onToggleSelection,
        state: { layers, searchTerm },
        mapId,
        onSelectInputChange,
      }) => {
        const selectedLayersLen =
          layers.length > 0 && layers.filter(layer => layer.selected).length;
        const isSearched = searchTerm => item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return layers.length < 1 ? (
          <Dimmer active style={{ height: '100vh' }} inverted>
            <Loader size="massive" inverted />
          </Dimmer>
        ) : (
          <Fragment>
            <Header>
              <Menu.Item>
                <h3>EZ Map It</h3>
              </Menu.Item>
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
                          toggleSelection={onToggleSelection}
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
                    <Message warning>
                      Please select only upto five layers
                    </Message>
                  )}
                </Grid.Column>
              </Grid>
            </Container>
          </Fragment>
        );
      }}
    </Consumer>
  );
};

export default Layers;
