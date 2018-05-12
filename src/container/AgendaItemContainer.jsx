import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAgendas,
} from '../ducks/agendas';
import {
  Button,
  Container,
  Header,
  Icon,
  Modal,
  Segment,
} from 'semantic-ui-react'
import moment from 'moment';
import qs from 'query-string';

class AgendaItemContainer extends Component {
    render () {
        const {
            addId,
            id,
            body,
            defaultOpen,
            location,
            meeting_time,
            recommendations,
            removeId,
            title,
            showForm
        } = this.props;

        const meetingDate = () => {
            let meetTime = moment(meeting_time * 1000);
            return (
                <div>
                    <p>Hearing Date: {meetTime.format("M/D/YYYY")}</p>
                    <p>Hearing Time: {meetTime.format("h:mm a")}</p>
                </div>
            );
        }
        
        const container = (
            <Container text style={{ marginTop: '5px', marginBottom: '8px', backgroundColor: 'lightgray', borderRadius: '5px'}}>
                <Segment.Group>
                    <Header
                        as='h3'
                        content={title}
                        textAlign='center'
                        style={{padding: '5px 10px 0px 10px'}}
                    />
                    <Segment>{meetingDate()}</Segment>
                    <Segment>{body[0]}</Segment>
                    <Segment>{body[1]}</Segment>
                </Segment.Group>
            </Container>);

        const recommendation = 
            recommendations[0] ? (
                <div>
                    <p>Recommendation:</p>
                    <p>{recommendations[0].recommendation}</p>
                    <p>What is your stance on the recommended action?</p>
                </div>
            ) : (
                <div>
                    <p>No recommended Action</p>
                </div>
            );
        
        return  (
            <Modal
                closeIcon
                defaultOpen={defaultOpen}
                onOpen={()=> {addId(id)}}
                onClose={removeId}
                style={{ color: 'black'}}
                trigger={container}
            >
                <Modal.Header>{title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {meetingDate()}
                        <p>{body[0]}</p>
                        <p>{body[1]}</p>
                        {recommendation}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                   <Button
                      primary
                      onClick={evt => {
                        showForm("pro");
                      }}
                    >
                      Pro <Icon name="right chevron" />
                    </Button>
                    <Button
                      primary
                      onClick={evt => {
                        showForm("con");
                      }}
                    >
                      Con <Icon name="right chevron" />
                    </Button>
                  </Modal.Actions>
                    </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        // agendaItems: state.agendas.agendaItems,
        // agendaIDs: state.agendas.agendaIDs,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ requestAgendas }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AgendaItemContainer)