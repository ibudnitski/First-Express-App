import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3003;

// Middleware to parse JSON body
app.use(express.json());

// Movie data
let movies = [
    { id: 1, title: "Inception", year: 2010 },
    { id: 2, title: "Interstellar", year: 2014 },
    { id: 3, title: "The Matrix", year: 1999 },
    { id: 4, title: "The Dark Knight", year: 2008 },
];

// Routes

// ✅ Get all movies
app.get("/movies", (req: Request, res: Response) => {
    res.json(movies);
});

// ✅ Get a single movie by ID
// @ts-ignore
app.get("/movies/:id", (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
});

// ✅ Create a new movie
// @ts-ignore
app.post("/movies", (req: Request, res: Response) => {
    const { title, year } = req.body;

    if (!title || !year) {
        return res.status(400).json({ message: "Title and year are required" });
    }

    const newMovie = { id: movies.length + 1, title, year };
    movies.push(newMovie);

    res.status(201).json(newMovie);
});

// ✅ Update a movie by ID
// @ts-ignore
app.put("/movies/:id", (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id);
    const { title, year } = req.body;

    const movieIndex = movies.findIndex((m) => m.id === movieId);
    if (movieIndex === -1) {
        return res.status(404).json({ message: "Movie not found" });
    }

    movies[movieIndex] = { ...movies[movieIndex], title, year };
    res.json(movies[movieIndex]);
});

// ✅ Delete a movie by ID
// @ts-ignore
app.delete("/movies/:id", (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id);
    const movieIndex = movies.findIndex((m) => m.id === movieId);

    if (movieIndex === -1) {
        return res.status(404).json({ message: "Movie not found" });
    }

    const deletedMovie = movies.splice(movieIndex, 1);
    res.json({ message: "Movie deleted", movie: deletedMovie });
});

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
