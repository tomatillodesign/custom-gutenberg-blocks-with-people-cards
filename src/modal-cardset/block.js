/**
 * Block dependencies
 */
import icons from './icons';
import './editor.css';
import './style.css';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    Editable,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    InspectorControls,
    RichText,
    URLInput,
    InnerBlocks,
} = wp.editor;
const {
    Button,
    SelectControl,
    RadioControl,
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
    RangeControl,
} = wp.components;
const { Fragment } = wp.element;

/**
 * Register example block
 */
export default registerBlockType(
    'cgb/modal-cardset',
    {
        title: __( 'Modal Cardset', 'clbmodalcardset' ),
        description: __( 'Add a set of interactive modal (pop up) cards to your content ', 'clbmodalcardset'),
        category: 'common',
	   icon: {
	        foreground: '#fff',
	        background: '#3883d6',
	        src: 'images-alt2',
	   },
        keywords: [ __( 'card' ), __( 'flip' ), __( 'image' ) ],
        attributes: {
            columnNumber: {
                type: 'number',
                default: 2,
            },
            flippedCardHeight: {
                value: 'number',
                default: 300,
            },
        },
        edit: props => {
            const { attributes: { columnNumber, flippedCardHeight },
                className, setAttributes, isSelected } = props;

                const onChangeColumnNumber = columnNumber => { setAttributes( { columnNumber } ) };
                const onChangeflippedCardHeight = flippedCardHeight => { setAttributes( { flippedCardHeight } ) };

            return (
                 <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Cardset Settings', 'clbinteractivecardset' ) }
                   >
                       <PanelRow>
                       <RangeControl
                            label="Number of Columns"
                            value={ columnNumber }
                            onChange={ onChangeColumnNumber }
                            min={ 1 }
                            max={ 4 }
                        />
                       </PanelRow>
                   </PanelBody>
               </InspectorControls>

               <div className={ className }>

               { isSelected ? (

                    <div className="cardset-selected">
                    <h4>Modal Card Set</h4>
                    <InnerBlocks
                        allowedBlocks={['clb-custom-blocks/modal-card']}
                   />
                    </div>

                            ) : (

                                 <div className="cardset-static">
                                        <h4>Modal Card Set</h4>
                                      <InnerBlocks
                                          allowedBlocks={['clb-custom-blocks/modal-card']}
                                     />

                                </div>

                            ) }
                </div>
                </Fragment>

            );
        },
        save: props => {
            const { columnNumber, flippedCardHeight } = props.attributes;

            let frSpacing = '1fr 1fr';
            if( columnNumber == 1) { frSpacing = '1fr'; }
            else if( columnNumber == 3) { frSpacing = '1fr 1fr 1fr'; }
            else if( columnNumber == 4) { frSpacing = '1fr 1fr 1fr 1fr'; }

            return (

                 // Try nesting a style for child flip cards, see: https://stackoverflow.com/a/10833154/5369381

                 <div className={ 'modal-cardset' + ' columns-' + columnNumber} >
                    <InnerBlocks.Content />
                </div>

            );
        },
    },
);
