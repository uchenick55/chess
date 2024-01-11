import {FiedType, FigueLightenedStepsType, RowType} from "../../components/common/types/commonTypes";

export const figueLightenedSteps = { // возможные комбинации подсветки в зависимости от имени фигуры
    "knight": [
        [{ rowInd: -2, collInd: -1 }],
        [{ rowInd: -2, collInd: 1 }],
        [{ rowInd: 2, collInd: -1 }],
        [{ rowInd: 2, collInd: 1 }],
        [{ rowInd: -1, collInd: -2 }],
        [{ rowInd: -1, collInd: 2 }],
        [{ rowInd: 1, collInd: -2 }],
        [{ rowInd: 1, collInd: 2 }]
    ],
    "bishop": [
        [{ rowInd: -1, collInd: -1 }, { rowInd: -2, collInd: -2 }, { rowInd: -3, collInd: -3 }, {
            rowInd: -4,
            collInd: -4
        }, { rowInd: -5, collInd: -5 }, { rowInd: -6, collInd: -6 }, { rowInd: -7, collInd: -7 }],
        [{ rowInd: -1, collInd: 1 }, { rowInd: -2, collInd: 2 }, { rowInd: -3, collInd: 3 }, {
            rowInd: -4,
            collInd: 4
        }, { rowInd: -5, collInd: 5 }, { rowInd: -6, collInd: 6 }, { rowInd: -7, collInd: 7 }],
        [{ rowInd: 1, collInd: -1 }, { rowInd: 2, collInd: -2 }, { rowInd: 3, collInd: -3 }, {
            rowInd: 4,
            collInd: -4
        }, { rowInd: 5, collInd: -5 }, { rowInd: 6, collInd: -6 }, { rowInd: 7, collInd: -7 }],
        [{ rowInd: 1, collInd: 1 }, { rowInd: 2, collInd: 2 }, { rowInd: 3, collInd: 3 }, {
            rowInd: 4,
            collInd: 4
        }, { rowInd: 5, collInd: 5 }, { rowInd: 6, collInd: 6 }, { rowInd: 7, collInd: 7 }]
    ],
    "rook": [
        [
            { rowInd: 0, collInd: -1 }, { rowInd: 0, collInd: -2 }, { rowInd: 0, collInd: -3 }, {
            rowInd: 0,
            collInd: -4
        },
            { rowInd: 0, collInd: -5 }, { rowInd: 0, collInd: -6 }, { rowInd: 0, collInd: -7 }],
        [{ rowInd: 0, collInd: 1 }, { rowInd: 0, collInd: 2 }, { rowInd: 0, collInd: 3 }, {
            rowInd: 0,
            collInd: 4
        }, { rowInd: 0, collInd: 5 }, { rowInd: 0, collInd: 6 }, { rowInd: 0, collInd: 7 }],
        [{ rowInd: -1, collInd: 0 }, { rowInd: -2, collInd: 0 }, { rowInd: -3, collInd: 0 }, {
            rowInd: -4,
            collInd: 0
        }, { rowInd: -5, collInd: 0 }, { rowInd: -6, collInd: 0 }, { rowInd: -7, collInd: 0 }],
        [{ rowInd: 1, collInd: 0 }, { rowInd: 2, collInd: 0 }, { rowInd: 3, collInd: 0 },
            {
                rowInd: 4,
                collInd: 0
            }, { rowInd: 5, collInd: 0 }, { rowInd: 6, collInd: 0 }, { rowInd: 7, collInd: 0 },]
    ],
    "king": [
        [{ rowInd: -1, collInd: -1 }],
        [{ rowInd: -1, collInd: 0 }],
        [{ rowInd: -1, collInd: 1 }],
        [{ rowInd: 0, collInd: -1 }],
        [{ rowInd: 0, collInd: 1 }],
        [{ rowInd: 1, collInd: -1 }],
        [{ rowInd: 1, collInd: 0 }],
        [{ rowInd: 1, collInd: 1 }]
    ],
    "queen": [
        [{ rowInd: -1, collInd: -1 }, { rowInd: -2, collInd: -2 }, { rowInd: -3, collInd: -3 }, {
            rowInd: -4,
            collInd: -4
        }, { rowInd: -5, collInd: -5 }, { rowInd: -6, collInd: -6 }, { rowInd: -7, collInd: -7 }],
        [{ rowInd: -1, collInd: 1 }, { rowInd: -2, collInd: 2 }, { rowInd: -3, collInd: 3 }, {
            rowInd: -4,
            collInd: 4
        }, { rowInd: -5, collInd: 5 }, { rowInd: -6, collInd: 6 }, { rowInd: -7, collInd: 7 }],
        [{ rowInd: 1, collInd: -1 }, { rowInd: 2, collInd: -2 }, { rowInd: 3, collInd: -3 }, {
            rowInd: 4,
            collInd: -4
        }, { rowInd: 5, collInd: -5 }, { rowInd: 6, collInd: -6 }, { rowInd: 7, collInd: -7 }],
        [{ rowInd: 1, collInd: 1 }, { rowInd: 2, collInd: 2 }, { rowInd: 3, collInd: 3 }, {
            rowInd: 4,
            collInd: 4
        }, { rowInd: 5, collInd: 5 }, { rowInd: 6, collInd: 6 }, { rowInd: 7, collInd: 7 }],
        [{ rowInd: 0, collInd: -1 }, { rowInd: 0, collInd: -2 }, { rowInd: 0, collInd: -3 }, {
            rowInd: 0,
            collInd: -4
        }, { rowInd: 0, collInd: -5 }, { rowInd: 0, collInd: -6 }, { rowInd: 0, collInd: -7 }],
        [{ rowInd: 0, collInd: 1 }, { rowInd: 0, collInd: 2 }, { rowInd: 0, collInd: 3 }, {
            rowInd: 0,
            collInd: 4
        }, { rowInd: 0, collInd: 5 }, { rowInd: 0, collInd: 6 }, { rowInd: 0, collInd: 7 }],
        [{ rowInd: -1, collInd: 0 }, { rowInd: -2, collInd: 0 }, { rowInd: -3, collInd: 0 }, {
            rowInd: -4,
            collInd: 0
        }, { rowInd: -5, collInd: 0 }, { rowInd: -6, collInd: 0 }, { rowInd: -7, collInd: 0 }],
        [{ rowInd: 1, collInd: 0 }, { rowInd: 2, collInd: 0 }, { rowInd: 3, collInd: 0 }, {
            rowInd: 4,
            collInd: 0
        }, { rowInd: 5, collInd: 0 }, { rowInd: 6, collInd: 0 }, { rowInd: 7, collInd: 0 }],
    ],
    "pawn": [
        [{ rowInd: 1, collInd: 0 }]
    ]
} as FigueLightenedStepsType

export const field = [
    [
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "rook", color: "black"},
            cellColor: "white",
            cellAddress: "a8"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "black"},
            cellColor: "black",
            cellAddress: "b8"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "bishop", color: "black"},
            cellColor: "white",
            cellAddress: "c8"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "queen", color: "black"},
            cellColor: "black",
            cellAddress: "d8"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "king", color: "black"},
            cellColor: "white",
            cellAddress: "e8"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "bishop", color: "black"},
            cellColor: "black",
            cellAddress: "f8"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "black"},
            cellColor: "white",
            cellAddress: "g8"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "rook", color: "black"},
            cellColor: "black",
            cellAddress: "h8"
        },
    ] as RowType,
    [
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
            cellColor: "black",
            cellAddress: "a7"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
            cellColor: "white",
            cellAddress: "b7"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
            cellColor: "black",
            cellAddress: "c7"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
            cellColor: "white",
            cellAddress: "d7"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
            cellColor: "black",
            cellAddress: "e7"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
            cellColor: "white",
            cellAddress: "f7"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
            cellColor: "black",
            cellAddress: "g7"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "black", isFirstStep: true},
            cellColor: "white",
            cellAddress: "h7"
        },
    ] as RowType,
    [
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "a6"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "black"},
            cellColor: "black",
            cellAddress: "b6"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "black"},
            cellColor: "white",
            cellAddress: "c6"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "black"},
            cellColor: "black",
            cellAddress: "d6"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "white"},
            cellColor: "white",
            cellAddress: "e6"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "white"},
            cellColor: "black",
            cellAddress: "f6"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "white"},
            cellColor: "white",
            cellAddress: "g6"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "h6"
        },
    ] as RowType,
    [
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "a5"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "b5"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "c5"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "d5"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "e5"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "f5"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "white"},
            cellColor: "black",
            cellAddress: "g5"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "black"},
            cellColor: "white",
            cellAddress: "h5"
        },
    ] as RowType,
    [
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "white"},
            cellColor: "white",
            cellAddress: "a4"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "black"},
            cellColor: "black",
            cellAddress: "b4"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "c4"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "d4"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "e4"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "f4"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "g4"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "h4"
        },
    ] as RowType,
    [
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "a3"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "b3"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "c3"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "d3"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "e3"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "f3"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "black",
            cellAddress: "g3"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "empty", color: "unset"},
            cellColor: "white",
            cellAddress: "h3"
        },
    ] as RowType,
    [
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
            cellColor: "white",
            cellAddress: "a2"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
            cellColor: "black",
            cellAddress: "b2"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
            cellColor: "white",
            cellAddress: "c2"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
            cellColor: "black",
            cellAddress: "d2"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
            cellColor: "white",
            cellAddress: "e2"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
            cellColor: "black",
            cellAddress: "f2"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
            cellColor: "white",
            cellAddress: "g2"
        },
        {
            isLightened: false, isDarkened: false,
            cellFigue: {figue: "pawn", color: "white", isFirstStep: true},
            cellColor: "black",
            cellAddress: "h2"
        },
    ] as RowType,
    [
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "rook", color: "white"},
            cellColor: "black",
            cellAddress: "a1"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "white"},
            cellColor: "white",
            cellAddress: "b1"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "bishop", color: "white"},
            cellColor: "black",
            cellAddress: "c1"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "queen", color: "white"},
            cellColor: "white",
            cellAddress: "e1"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "king", color: "white"},
            cellColor: "black",
            cellAddress: "d1"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "bishop", color: "white"},
            cellColor: "white",
            cellAddress: "f1"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "knight", color: "white"},
            cellColor: "black",
            cellAddress: "g1"
        },
        {
            isLightened: false,
            isDarkened: false,
            cellFigue: {figue: "rook", color: "white"},
            cellColor: "white",
            cellAddress: "h1"
        },
    ] as RowType,

] as FiedType
