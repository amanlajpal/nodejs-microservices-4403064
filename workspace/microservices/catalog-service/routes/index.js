const express = require("express");
const CatalogService = require("../lib/CatalogService");

const router = express.Router();

router.get("/items", async (req, res) => {
  try {
    const items = await CatalogService.getAll();
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error!" })
  }
})

router.get("/items/:id", async (req, res) => {
  try {
    const item = await CatalogService.getOne(req.params.id);
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error!" })
  }
})

router.post("/items", async (req, res) => {
  try {
    const item = await CatalogService.create(req.body);
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error!" })
  }
})

router.put("/items/:id", async (req, res) => {
  try {
    const item = await CatalogService.update(req.params.id, req.body);
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error!" })
  }
})

router.delete("/items/:id", async (req, res) => {
  try {
    const item = await CatalogService.delete(req.params.id);
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error!" })
  }
})

module.exports = router;
