import BlockView from "../../../core/block/BlockView";
export declare class VAccentBlock extends BlockView {
    title: string;
    showTitle: boolean;
    main: string;
    expand: {
        [title: string]: string;
    };
}
