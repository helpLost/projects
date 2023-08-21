#ifndef SRC_SCENE_HPP
#define SRC_SCENE_HPP

    #include <Utilities.hpp>
    namespace prj
    {
        class Filter {};

        class Mesh
        {

        };
        
        class Model
        {  
            private:
                glm::vec3 m_POS, m_SCALE;
            public:
                Model(std::string filepath);
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