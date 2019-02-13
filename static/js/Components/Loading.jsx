import React from 'react';
import { PacmanLoader } from 'react-spinners';
import { css } from '@emotion/core';

export const Loading = () => {
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: white;
    `;

    return (
        <div className='loader-container'>
            <div className='sweet-loading'>
                <PacmanLoader
                    css={override}
                    sizeUnit={"px"}
                    size={25}
                    color={'#4A4A4A'}
                    loading={true}
                />
            </div>
        </div>
    );
}