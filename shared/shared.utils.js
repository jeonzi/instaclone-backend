import AWS from "aws-sdk";

AWS.config.update({
	credentials: {
		accessKeyId: process.env.AWS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
	},
});

export const uploadToS3 = async (file, userId, folderName) => {
	const { filename, createReadStream } = await file;
	const readStream = createReadStream();
	const newFilename = `${folderName}/${userId}-${Date.now()}-${filename}`;
	const { Location } = await new AWS.S3()
		.upload({
			Bucket: "jeonzi-instaclone-uploads",
			Key: newFilename,
			ACL: "public-read", // 아무나 파일을 읽을 수 있음
			Body: readStream, // file (Stream)
		})
		.promise();
	return Location;
};
