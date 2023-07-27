import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const PowerForm = (props: any) => {
    return (
      <Container className="mt-3 bg-dark text-light p-3">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Archetype</Form.Label>
              <Form.Select
                value={props.archetype}
                onChange={e => props.handleArchetypeChange(e)}
              >
                <option value=""></option>
                <option value="Blaster">Blaster</option>
                <option value="Brute">Brute</option>
                <option value="Scrapper">Scrapper</option>
                <option value="Sentinel">Sentinel</option>
                <option value="Stalker">Stalker</option>
                <option value="Tanker">Tanker</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Damage Set</Form.Label>
              <Form.Select
                onChange={e => props.handlePrimaryChange(e)}
              >
                {
                  props.primaryList.map((primary: string, i: number) => {
                    return (
                      <option value={primary} key={i}>{primary}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Secondary Set</Form.Label>
              <Form.Select
                onChange={e => props.handleSecondaryChange(e)}
              >
                {
                  props.secondaryList.map((secondary: string, i: number) => {
                    return (
                      <option value={secondary} key={i}>{secondary}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Epic</Form.Label>
              <Form.Select
                onChange={e => props.handleEpicChange(e)}
              >
                {
                  props.epicList.map((epic: string, i: number) => {
                    return (
                      <option value={epic} key={i}>{epic}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    )
}