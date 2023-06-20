import Document from "../db/models/Document";
import { Request, Response } from "express";
import helper from "../functionHelpers/helper";
import cosineSimilarity from "../functionHelpers/cosineSimilarity";
import { or } from "sequelize";
let docArray: Document[] = [];
let queryArray: string[] = [];
let resultArray: number[] = [];
let classInput: string;

const docInput = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, content, docClass } = req.body;
        docArray.push(content);
        const document = await Document.create({
            name,
            content,
            docClass   
        });
        return res.status(201).send(helper.responseData(201, "Created.", null, document));
    } catch (error:any) {
        return res.status(500).send(helper.responseData(500, "", error, null)); 
}
};

const docQuery = async (req: Request, res: Response): Promise<Response> => {
    try {
        let total = await Document.count();
        const { query } = req.body;

        if (total != 0) {
            for (let i = 1; i <= total; i++) {
                const document = await Document.findOne({
                    where:{
                        id: i
                    }
                });
                if (document) {
                    let result = cosineSimilarity(query, document.content);
                    resultArray.push(result);

                }
            }
            return res.status(200).send(helper.responseData(200, "OK", null, resultArray));
        }
        return res.status(200).send(helper.responseData(200, "OK", null, resultArray));
        
    } catch (error) {
        return res.status(500).send(helper.responseData(500, "", error, null));
    }
};

const docQueryClass = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, content } = req.body;
  
      // Ambil semua dokumen dari database
      const documents = await Document.findAll();
    
      console.log(documents); // Periksa apakah dokumen berhasil diambil dari database
  
      if (documents.length > 0) {
        let max = -Infinity;
        let documentClass = ""; // Inisialisasi variabel dengan string kosong
  
        // Lakukan perulangan untuk menghitung cosine similarity dan mencari nilai maksimum
        for (let i = 0; i < documents.length; i++) {
          const document = documents[i];
          const result = cosineSimilarity(content, document.content);
          resultArray.push(result);
  
          if (result > max) {
            max = result;
            documentClass = document.docClass;
          }
        }
  
        if (documentClass === "") { // Periksa apakah documentClass masih string kosong
          return res
            .status(500)
            .send(helper.responseData(500, "", null, null));
        }
  
        // Ambil dokumen dengan nilai cosine similarity maksimum
        const documentWithMaxResult = documents.find(
          (document) => document.docClass === documentClass
        );
  
        console.log(documentWithMaxResult); // Periksa apakah dokumen dengan nilai cosine similarity maksimum ditemukan
  
        if (!documentWithMaxResult) {
          return res
            .status(500)
            .send(helper.responseData(500, "", null, null));
        }
  
        // Buat Document baru dengan kelas yang sama dengan nilai maksimum
        if(documentWithMaxResult.docClass === null || documentWithMaxResult.docClass === ""){
            return res.status(500).send(helper.responseData(500, "", null, null));
        }
        const newDocument = await Document.create({
          name,
          content,
          docClass: documentWithMaxResult.docClass,
        });
  
        return res
          .status(200)
          .send(helper.responseData(200, "OK", null, newDocument));
      }
  
      return res.status(200).send(helper.responseData(200, "OK", null, null));
    } catch (error) {
      console.log(error);
      return res.status(500).send(helper.responseData(500, "", error, null));
    }
  };

export default { docInput, docQuery, docQueryClass };
