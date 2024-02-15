"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkTheme = exports.lightTheme = void 0;
exports.lightTheme = {
    themeVariables: {
        fontFamily: 'Open Sans',
        primaryColor: '#ecf6ff',
        primaryBorderColor: '#4672c4',
        lineColor: '#4672c4',
        edgeLabelBackground: '#fff',
        clusterBkg: '#ffffde',
        clusterBorder: '#bcbc58',
    },
    themeCSS: `
        .edgeLabel, .edgeLabel span { font-size: 14px; color: #717171; }

        .featured {
            .nodeLabel
            {
                font-size: 18px;
                font-weight: 600;
                color: white;
            }

            rect { 
                fill: #4672c4;
            }
        }
    `,
};
exports.darkTheme = {
    themeVariables: {
        fontFamily: 'Open Sans',
        primaryColor: '#263044',
        primaryTextColor: '#dae6f0',
        primaryBorderColor: '#4672c4',
        lineColor: '#4672c4',
        edgeLabelBackground: '#2d2d2d',
        clusterBkg: '#49482f',
        clusterBorder: '#6b6a45',
    },
    themeCSS: `
        .edgeLabel, .edgeLabel span { font-size: 14px; color: #949494; }

        .featured {
            .nodeLabel
            {
                font-size: 18px;
                font-weight: 600;
                color: white;
            }

            rect { 
                fill: #4672c4;
            }
        }
    `,
};
