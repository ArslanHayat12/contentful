import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import ProcessItem, { ProcessIndex } from './workingProcess.style';
//import { PROCESS_ITEMS } from 'common/data/SaasModern';
import getPage from '../../../common/components/ContentFull/contentFull';
const WorkingProcessSection = ({
  sectionWrapper,
  secTitleWrapper,
  secText,
  secHeading,
  processRow,
  processCol,
  processImageStyle,
  processTitleStyle,
  processDescriptionStyle,
  workingProcessContent
}) => {
  const [items,setItems]=useState([])
  useEffect(async() => {
    const params = {
      content_type: 'saasModernItems',
      
    }
    let   client= getPage()
    let result=await client.getEntries(params)
    console.log(result)
    setItems(result?.items||[])

    //   setData(result.items)

  }, [])
  return (
    <Box {...sectionWrapper} as="section">
      <Container>
        <Box {...secTitleWrapper}>
          <Text {...secText} content={workingProcessContent?.title} />
          <Heading
            {...secHeading}
            content={ workingProcessContent?.description}
          />
        </Box>

        <Box {...processRow}>
          {items.reverse().map((item, index) => (
            <Box
              {...processCol}
              key={`process-item-${index}`}
              className="process_item_col"
            >
              <ProcessItem className="process_item">
                <ProcessIndex>{item.index || index + 1}</ProcessIndex>
                <Image
                  src={item.fields.image.fields.file.url}
                  alt={`process-image-${index + 1}`}
                  {...processImageStyle}
                />
                <Heading as="h3" content={item?.fields?.title} {...processTitleStyle} />
                <Text content={item?.fields?.description} {...processDescriptionStyle} />
              </ProcessItem>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

WorkingProcessSection.propTypes = {
  sectionWrapper: PropTypes.object,
  secTitleWrapper: PropTypes.object,
  secTitle: PropTypes.object,
  secDescription: PropTypes.object,
  processRow: PropTypes.object,
  processCol: PropTypes.object,
  processImageStyle: PropTypes.object,
  processTitleStyle: PropTypes.object,
  processDescriptionStyle: PropTypes.object,
};

WorkingProcessSection.defaultProps = {
  sectionWrapper: {
    pt: ['60px', '15px', '15px', '15px', '15px'],
    pb: 0,
  },
  secTitleWrapper: {
    mb: ['60px', '100px'],
  },
  secText: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0.15em',
    fontWeight: '700',
    color: '#1877F2',
    mb: '5px',
  },
  secHeading: {
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '500',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
    lineHeight: '1.67',
  },
  processRow: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: ['0', '-15px', '-20px', '-35px', '-45px'],
    mr: ['0', '-15px', '-20px', '-35px', '-45px'],
  },
  processCol: {
    width: [1, 1 / 3],
    pl: ['0', '15px', '20px', '35px', '45px'],
    pr: ['0', '15px', '20px', '35px', '45px'],
    mb: '40px',
  },
  processImageStyle: {
    width: ['60px', '60px', '70px', 'auto'],
  },
  processTitleStyle: {
    fontSize: ['20px', '18px', '20px', '20px', '20px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.02em',
    mb: ['20px', '20px', '22px', '22px', '22px'],
    mt: '35px',
  },
  processDescriptionStyle: {
    fontSize: ['15px', '15px', '15px', '15px'],
    fontWeight: '400',
    color: '#343d48',
    lineHeight: '1.87',
  },
};

export default WorkingProcessSection;
