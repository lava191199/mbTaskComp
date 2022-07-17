import React, { Component } from 'react'
import { batch } from 'react-redux';
import { connect } from 'react-redux';
import { getCollegeDataRequest } from '../../../store/mbTask/actions';
import { SuperParentContext } from './cotext';
import { ActionComp, TaskManager, Item, View, Parent } from './taskindex';
import { Container } from 'reactstrap';


export class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: Item,
            view: View,
            actionComp: ActionComp,
            taskManager: TaskManager
        }
    }
    componentDidMount() {
        batch(() => {
            this.props.getCollegeDataRequest(true);
        })
    }
    render() {
        return (
            <>
                <Container fluid className="h-100">
                    <SuperParentContext.Provider value={this.state}>
                        <Parent />
                    </SuperParentContext.Provider>
                </Container>
            </>
        )
    }
}
export default connect(null, { getCollegeDataRequest })(Main);