import app, { Component } from 'apprun';

export default class TestComponent extends Component
{
    state = 'test is working';

    view = (state) => <div>
    <h1>{state}</h1>
    </div>;

    update = {
        '#Test': state => state
    };
}
