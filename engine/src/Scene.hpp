#ifndef SRC_SCENE_HPP
#define SRC_SCENE_HPP

    #include <Utilities.hpp>
    #include <Shader.hpp>
    namespace prj
    {
        struct Vertex { glm::vec3 position, normal, tangent, bitagent; glm::vec2 texture; int bones[4]; float weights[4];};
        struct Texture { unsigned ID; std::string path, type; };

        class Filter {};
        class Mesh
        {
            private:
                std::vector<Vertex> m_VERTICES;
                std::vector<unsigned> m_INDICES;
                std::vector<Texture> m_TEXTURES;
                unsigned VAO;

                bool readMesh(std::string filePath), readTexture(std::string filePath, std::string fileDirectory);
            public:
                Mesh(std::vector<Vertex> vertices, std::vector<unsigned> indices, std::vector<Texture> textures);
                void setupBuffer(), draw(Shader &shader);
        };
        
        class Model
        {  
            private:
                glm::vec3 m_POS, m_SCALE;
            public:
                Model(std::string filepath);
                ~Model() { std::cout << "out"; }
                void draw();
        };

        class Scene
        {
            private:
                std::vector<Model> s_MODELS;
                std::vector<Filter> s_FILTERS;
                std::string s_FILES;

                const bool s_CUTSCENE;
            public:
                Scene(bool cutscene, std::vector<Model> models, std::vector<Filter> filters, std::string inputList);
                void process();
                void draw() { for (int i = 0; i < s_MODELS.size(); i++) { s_MODELS[i].draw(); }}
        };
    }
    
#endif