#include <Scene.hpp>
bool convert(std::string filePath, std::string fileDirectory, std::string fileFormat);
namespace prj
{
    Scene::Scene(bool cutscene, std::vector<Model> models, std::vector<Filter> filters, std::string inputList)
        :s_CUTSCENE(cutscene), s_MODELS(models), s_FILTERS(filters)
    {

    }
}
bool convert(std::string filePath, std::string fileDirectory, std::string fileFormat) 
{

}