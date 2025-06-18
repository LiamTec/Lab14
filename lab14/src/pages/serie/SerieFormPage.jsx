import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { getAllCategoryService } from "../../services/CategoryService";
import { createSerieService } from "../../services/SerieServices";

const initData = {
    name: '',
    description: '',
    img: '', 
    category: '',
};

function SerieFormPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(initData);
    const [file, setFile] = useState(null); 

    const loadCategories = async () => {
        const resp = await getAllCategoryService();
        setCategories(resp.data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        if (file) {
            formData.append('img', file);
        }

        try {
            await createSerieService(formData); 
            navigate('/series');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <h3>Nueva - Serie</h3>
                </div>
                <form onSubmit={handleSubmit} className="row" encType="multipart/form-data">
                    <div className="col-md-4">
                        <img
                            className="card-img-top"
                            src={file ? URL.createObjectURL(file) : "https://dummyimage.com/400x250/000/fff&text=imagen"}
                            alt="preview"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                className="form-control"
                                id="inputName"
                                value={data.name}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputDescription" className="form-label">Descripción</label>
                            <textarea
                                name="description"
                                onChange={handleChange}
                                className="form-control"
                                id="inputDescription"
                                value={data.description}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputCategory" className="form-label">Categoría</label>
                            <select
                                name="category"
                                onChange={handleChange}
                                className="form-select"
                                id="inputCategory"
                                value={data.category}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.id}>{item.description}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImage" className="form-label">Imagen</label>
                            <input
                                type="file"
                                name="img"
                                className="form-control"
                                id="inputImage"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary me-2">Guardar</button>
                            <Link className="btn btn-secondary" to="/series">Cancelar</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SerieFormPage;
