import React from 'react';
export const Loading = () => {
    return (
        <React.Fragment>
        <div className="col-12 d-flex justify-content-center">
            <span className="fa fa-spinner fa-pulse fa-fw fa-3x text-primary"></span>
        </div>
        <div className="col-12 text-center">
            <p>Loading...</p>
        </div>
        </React.Fragment>
    )
}