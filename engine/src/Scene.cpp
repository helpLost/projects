#include <Scene.hpp>
namespace prj
{
    Mesh::Mesh(std::vector<Vertex> vertices, std::vector<unsigned> indices, std::vector<Texture> textures) :m_VERTICES(vertices), m_INDICES(indices), m_TEXTURES(textures) 
    { setupBuffer(); }

    void Mesh::draw(Shader &shader)
    {

    }

    void Mesh::setupBuffer()
    {
    }

    Model::Model(std::string filepath)
    {
    }

    void Model::draw()
    {
    }

    Scene::Scene(bool cutscene, std::vector<Model> models, std::vector<Filter> filters, std::string inputList)
        :s_CUTSCENE(cutscene), s_MODELS(models), s_FILTERS(filters)
    {
        std::cout << "Scene" << std::endl;
    }

    void Scene::process()
    {
    }
}