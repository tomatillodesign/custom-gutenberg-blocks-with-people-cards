/**
 * Block dependencies
 */
//import classnames from 'classnames';
import icon from './icon';
import './style.css';
import './editor.css';

/**
 * Internal block libraries
 */

const { Fragment } = wp.element;
const {
    registerBlockType,
} = wp.blocks;
const {
    //InspectorControls, RichText, ColorPalette,
    InspectorControls, RichText, PanelColorSettings, InnerBlocks,
} = wp.blockEditor;
const {
     Toolbar,
    Button,
    Tooltip,
    Panel,
    PanelBody,
    PanelColor,
    PanelRow,
    FormToggle,
    TextControl,
    IconButton,
    RangeControl,
    ColorPalette,
} = wp.components;


/**
 * Register example block
 */
export default registerBlockType(
    'clb-custom-blocks/collapse',
    {
        title: 'Collapse',
        description:  'Create a collapsible section on the page.',
        category: 'common',
        icon: {
               foreground: '#fff',
               background: '#3883d6',
            src: icon,
        },
        keywords: [
            'collapsing',
            'toggle',
            'faq'
        ],
        attributes: {
             title: {
                type: 'string',
                source: 'text',
                selector: '.collapse-title-input',
             },
             content: {
                 type: 'array',
                 source: 'children',
                 selector: '.collapse-content-body',
            },
             backgroundColor: {
                  type: 'string',
                  default: '#333333'
             },
             titleID: {
                  type: 'string'
             },
             icon: {
                  type: 'string',
                  default: ''
             },
        },

        edit: props => {
            const { attributes: { title, content, backgroundColor, titleID, icon }, className, isSelected, setAttributes } = props;

            const onChangeTitle = title => { setAttributes( { title } ) };
            const onChangeContent = content => { setAttributes( { content } ) };
            const onChangeIcon = icon => { setAttributes( { icon } ) };

            function slugify(text) {

                if( !text ) { return ''; }
                   return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .replace(/^-+/, '')             // Trim - from start of text
                    .replace(/-+$/, '');            // Trim - from end of text
                 }



            const setTitleID = titleID => { setAttributes( { titleID : slugify(title) } ) };
            //titleID = Math.round((Math.random()*10000000));

             //let titleID = slugify(title);
             setTitleID();

            return [
                 <InspectorControls>

                    <PanelBody
                       title={ 'Collapse Settings' }
                       icon="admin-page"
                       initialOpen={ true }
                    >
                    <TextControl
                        label={ 'Icon (Optional)' }
                        help={ 'Copy the icon text from fontawesome.com/icons. Eg: lightbulb-on' }
                        value={ icon }
                        onChange={ onChangeIcon }
                    />

                     <PanelColorSettings
                         title={'Background Color'}
                         colorSettings={[
                           {
                             label: "Color Picker",
                             value: backgroundColor,
                             onChange: backgroundColor => {
                               setAttributes({ backgroundColor });
                             }
                           }
                         ]}
                       />
                    </PanelBody>

                 </InspectorControls>,

                <div className={"clb-collapse-area " + className} >
                { isSelected ? (
                     <div>
                     <div className ={ className + "-selected-title" } >
                     <TextControl
                          className='collapse-title-input'
                          label={ 'Title' }
                          value={ title }
                          placeholder={ 'Collapsible Button Title' }
                          onChange={ onChangeTitle }
                     />
                     </div>
                     <InnerBlocks />
                    </div>
               ) : (
                  <div className="collapse-static">
                       <div className="title-area" style={ { backgroundColor: backgroundColor } }>{title} <span className="dashicons dashicons-arrow-down-alt2"></span></div>
                       <div className="inner-block-content">
                         <InnerBlocks />
                       </div>
                  </div>
               )}
                </div>
           ];
        },
        save: props => {
                    const { attributes: { title, content, backgroundColor, titleID, icon }, className } = props;

                    function getContrastYIQ(hexcolor){

                           var r = parseInt(hexcolor.substr(1,2),16);
                           var g = parseInt(hexcolor.substr(3,2),16);
                           var b = parseInt(hexcolor.substr(5,2),16);
                           var yiq = ((r*299)+(g*587)+(b*114))/1000;
                           return (yiq >= 128) ? 'dark' : 'light';
                       }

                    let iconToPublish = <div className="collapse-icon"><i className={ `fal fa-${icon} fa-3x` }></i></div>;
                    if( icon == '' ) { iconToPublish = null; }

                    return (
                         <div className={"clb-collapse-area"}>
                         <a className="collapse-section collapsed" data-toggle="collapse" href={"#" + titleID} aria-expanded="false" aria-controls="button-title-here">
                         <div className={`collapse-button-area foreground-text-${getContrastYIQ(backgroundColor)}` } style={ {backgroundColor: backgroundColor} }>{iconToPublish}<div className="collapse-title-input">{title}</div><span className="dashicons down dashicons-arrow-down-alt2"></span><span className="dashicons up dashicons-arrow-up-alt2"></span></div></a>
                              <div className="collapse" id={titleID}>
                                   <div className="collapse-text collapse-content-body">
                                        {content}
                                        <InnerBlocks.Content />
                                   </div>
                              </div>
                         </div>
                    );
                },
    },
);
