module.exports.validateFields = (source, expected=[]) => {

    expected.forEach( field => {
      if(!source[field]) throw new Error(`${field} is missing from paramter`)
    })
  
 }

  
