const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer'); // To handle file uploads 
const app = express();

const PORT = 5000;

// Setup image upload folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Middleware to parse JSON requests
app.use(express.json({ limit: '1000mb' }));
app.use(cors()); // Allow cross-origin requests from your frontend

// Setup multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Path to the listings file
const listingsFilePath = path.join(__dirname, 'listings.json');

// Function to handle image uploads
const handleImageUploads = (req, res) => {
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No images uploaded' });
    }

    const imageUrls = req.files.map(file => {
        return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    });

    return res.status(200).json({ imageUrls });
};

// Function to add listing with image URLs
const addListing = (req, res) => {
    const newListing = req.body;
    const { images } = newListing;

    // Read the existing listings from the file
    fs.readFile(listingsFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading listings file' });
        }

        const listings = JSON.parse(data || '[]');
        listings.push(newListing); // Add the new listing

        // Write the updated listings to the file
        fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving listings file' });
            }
            res.status(200).json({ message: 'Listing added successfully!' });
        });
    });
};

//Function to fetch the listings from the JSON file
const getListings = (req, res) => {
    fs.readFile(listingsFilePath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).json({error: 'Error reading listings file.'});
        }
        const listings = JSON.parse(data || '[]');
        res.status(200).json(listings);
    });
};

//Function to fetch the images 
const getImages = (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if(err){
            return res.status(500).json({error : 'Error reading uploads directory.'})
        };

        const imagesUrls = files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file}`);

        res.status(200).json({images: imagesUrls});
    });
};

// Endpoint to handle image uploads
app.post('/uploadImages', upload.array('images', 20), handleImageUploads);

// Endpoint to add a new listing
app.post('/addListing', addListing);

//Endpoint to handle fetching the listings
app.get('/getListings', getListings);

//Endpoint to handle fetching the images
app.get('/getImages', getImages);

// Serve images from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
