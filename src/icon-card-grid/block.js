/**
 * Block dependencies
 */
import icon from './icons';
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
    'cgb/icon-card-grid',
    {
        title: __( 'Icon Card Grid', 'clb-icon-card-grid' ),
        description: __( 'Add a responsive icon card grid to your page ', 'clb-icon-card-grid'),
        category: 'common',
	   icon: {
             foreground: '#fff',
	        background: '#3883d6',
	        src: 'admin-page',
	   },
        keywords: [ __( 'icon' ), __( 'grid' ), __( 'card' ) ],
        attributes: {
            columnNumber: {
                type: 'number',
                default: 3,
            },
        },
        edit: props => {
            const { attributes: { columnNumber },
                className, setAttributes, isSelected } = props;

                const onChangeColumnNumber = columnNumber => { setAttributes( { columnNumber } ) };

            return (
                 <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Icon Card Grid Settings', 'clb-icon-card-grid' ) }
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

                    <div className="icon-card-grid-selected">
                    <h4>Icon Card Grid</h4>
                    <InnerBlocks
                         allowedBlocks={['cgb/clb-icon-card']}
                    />
                    </div>

                            ) : (

                                 <div className="icon-card-grid-static">
                                        <h4>Icon Card Grid</h4>
                                      <InnerBlocks
                                          allowedBlocks={['cgb/clb-icon-card']}
                                     />

                                </div>

                            ) }
                </div>
                </Fragment>

            );
        },
        save: props => {
            const { columnNumber } = props.attributes;

            // let frSpacing = '1fr 1fr';
            // if( columnNumber == 1) { frSpacing = '1fr'; }
            // else if( columnNumber == 3) { frSpacing = '1fr 1fr 1fr'; }
            // else if( columnNumber == 4) { frSpacing = '1fr 1fr 1fr 1fr'; }

            return (

                 <div className={ 'icon-card-grid' + ' columns-' + columnNumber} >
                    <InnerBlocks.Content />
                </div>

            );
        },
    },
);
