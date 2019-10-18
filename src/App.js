/**
 * App UI Entry Point
 * ------------------
 *
 * This file is rather complex because it puts together a couple of
 * different concepts just for demonstrative pourposes:
 *
 * - it is a Redux's connected component, so it can receive properties
 *   from the application's state and work with it.
 *
 * - it implements some Routes that allow to render different pages based
 *   on the browser's url.
 *
 * - it uses some translated text so to implementa multilanguage App.
 *
 * Even if things are not so desperately difficult to grasp here, testing
 * this component is a different thing altogether and I honestly believe
 * that what I wrote in this file is WAY TO COMPLICATED and should be
 * broken down in sub-components.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'

const mapState = ({ app }) => ({
    name: app.name,
})

const App = ({ name }) => (
    <>
        <Helmet>
            <title>{name}</title>
        </Helmet>
        <Switch>
            <Route exact path="/" component={() => 'home'} />
        </Switch>
    </>
)

App.propTypes = {
    name: PropTypes.string.isRequired,
}

export default connect(mapState)(App)
