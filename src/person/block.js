/**
 * Block dependencies
 */
import icon from './icon';
import './editor.scss';
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
} = wp.components;
const { Fragment } = wp.element;

/**
 * Register example block
 */
export default registerBlockType(
    'cgb/person',
    {
        title: __( 'Person Card', 'clb_person' ),
        description: __( 'Add a Person Card to your content ', 'clb_person'),
        category: 'common',
        parent: ['cgb/people'],
	   icon: {
	        foreground: '#fff',
	        background: '#3883d6',
	        src: icon,
	   },
        keywords: [ __( 'card' ), __( 'person' ), __( 'image' ) ],
        attributes: {
            imgURL: {
                type: 'string',
            },
            imgID: {
                type: 'number',
            },
            imgAlt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
           },
           cardType: {
 			type: 'string',
 			default: 'basic',
 		},
          cardName: {
			source: 'html',
			selector: '.clb-card__name',
		},
          cardTitle: {
			source: 'html',
			selector: '.clb-card__title',
			// default: __( 'Card Title' ),
		},
          cardBoardInfo: {
			source: 'html',
			selector: '.clb-card__board-info',
		},
        },
        edit: props => {
            const { attributes: { imgID, imgURL, imgAlt, cardType, cardTitle, cardName, cardBoardInfo },
                className, setAttributes, isSelected } = props;
            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imgURL: img.url,
                    imgAlt: img.alt,
                } );
            };
            const onRemoveImage = () => {
                setAttributes({
                    imgID: null,
                    imgURL: null,
                    imgAlt: null,
                });
            }

            const onChangeCardType = cardType => { setAttributes( { cardType } ) };
            const onChangeName = cardName => { setAttributes( { cardName } ) };
            const onChangeTitle = cardTitle => { setAttributes( { cardTitle } ) };
            const onChangeBoardInfo = cardBoardInfo => { setAttributes( { cardBoardInfo } ) };
            const onChangeBody = cardBody => { setAttributes( { cardBody } ) };
            const onChangeButtonText = buttonText => { setAttributes( { buttonText } ) };

            return (
			  <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'Card Settings', 'clb_person' ) }
                   >
                       <PanelRow>
                       <RadioControl
                            label="Card Type"
                            selected={ cardType }
                            options={ [
                                { label: 'Basic', value: 'basic' },
                                { label: 'Flip', value: 'flip' },
                            ] }
                            onChange={ onChangeCardType }
                         />

                       </PanelRow>
                   </PanelBody>
               </InspectorControls>

			 <div className={ className }>

                    { ! imgID ? (

                         <Fragment>
					<MediaUploadCheck>
	                        <MediaUpload
	                            onSelect={ onSelectImage }
	                            type="image"
	                            value={ imgID }
	                            render={ ( { open } ) => (
	                                <Button
	                                    className={ "button button-large" }
	                                    onClick={ open }
	                                >
	                                    { __( 'Upload Card Image', 'clb_person' ) }
	                                </Button>
	                            ) }
	                        >
	                        </MediaUpload>
				    </MediaUploadCheck>

                        <TextControl
                            className='clb-card__name'
                            label={ 'Person Name' }
                            value={ cardName }
                            placeholder={ 'Person Name' }
                            onChange={ onChangeName }
                       />

                        <TextControl
                            className='clb-card__title'
                            label={ 'Person Title & Credentials' }
                            value={ cardTitle }
                            placeholder={ 'Person Title & Credentials' }
                            onChange={ onChangeTitle }
                       />

                       <TextControl
                          className='clb-card__board-info'
                          label={ 'Board Title (Optional)' }
                          value={ cardBoardInfo }
                          placeholder={ 'President' }
                          onChange={ onChangeBoardInfo }
                     />


                       </Fragment>

                    ) : (

                         <div className ={ className }>

                         { isSelected ? (

                            <div className ={ className + "-selected" } >

                                <img
                                   src={ imgURL }
                                   alt={ imgAlt }
                                   className = "card-selected-image"
                                />

                                 <MediaUploadCheck>
                                    <MediaUpload
                                         onSelect={ onSelectImage }
                                         type="image"
                                         value={ imgID }
                                         render={ ( { open } ) => (
                                             <Button
                                                className={ "button button-large" }
                                                onClick={ open }
                                             >
                                                { __( 'Change Card Image', 'clb_person' ) }
                                             </Button>
                                         ) }
                                    >
                                    </MediaUpload>
                               </MediaUploadCheck>

                               <TextControl
                                   className='clb-card__name'
                                   label={ 'Person Name' }
                                   value={ cardName }
                                   placeholder={ 'Person Name' }
                                   onChange={ onChangeName }
                              />

                               <TextControl
                                   className='clb-card__title'
                                   label={ 'Person Title & Credentials' }
                                   value={ cardTitle }
                                   placeholder={ 'Person Title & Credentials' }
                                   onChange={ onChangeTitle }
                              />

                              <TextControl
                                 className='clb-card__board-info'
                                 label={ 'Board Title (Optional)' }
                                 value={ cardBoardInfo }
                                 placeholder={ 'President' }
                                 onChange={ onChangeBoardInfo }
                            />

                            </div>

                            ) : (

                                 <div className="clb-card-static">
                                      <img
                                        src={ imgURL }
                                        alt={ imgAlt }
                                        className = "card-static-image"
                                     />
                                     <div><strong>{cardName}</strong></div>
                                     <div>{cardTitle}</div>
                                     <div>{cardBoardInfo}</div>
                                </div>

                            ) }

                            </div>

                    )}

                </div>
			 </Fragment>
            );
        },
        save: props => {
            const { imgID, imgURL, imgAlt, cardType, cardTitle, cardName, cardBoardInfo } = props.attributes;

            return (

                 <div className={"interactive-card" + ' card-' + cardType}>

                 { cardType == 'basic' && (
                      <Fragment>
                               <img
                                  src={ imgURL }
                                  alt={ imgAlt }
                               />
                               <div className="person-card-body">
                                    <h4 className="clb-card__name">{cardName}</h4>
                                    <div className="clb-card__title">{cardTitle}</div>
                                    <div className="clb-card__board-info">{cardBoardInfo}</div>
                               </div>
                     </Fragment>
                 )}

                 { cardType == 'flip' && (
                      <div className="card-flip-inner">
                         <div className="flip-card-front" style={ {
							backgroundImage: `url(${ imgURL })`,
							backgroundSize: 'cover',
                                   backgroundPosition: 'center',
						} }>
                              <h4 className="clb-card__name">{cardName}</h4>
                         </div>
                              <div className="flip-card-back">
                                   <h4 className="clb-card__name">{cardName}</h4>
                                   <div className="clb-card__title">{cardTitle}</div>
                                  <div className="clb-card__board-info">{cardBoardInfo}</div>
                              </div>
                         </div>
                )}

                </div>
            );
        },
    },
);
