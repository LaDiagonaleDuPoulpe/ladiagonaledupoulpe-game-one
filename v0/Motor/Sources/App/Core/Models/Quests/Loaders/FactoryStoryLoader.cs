using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Loaders
{
    public class FactoryStoryLoader : IFactoryStoryLoader
    {
        #region Fields
        private IStoryLoader _loader = new MainStoryLoader();
        #endregion

        #region Public methods
        public IStoryLoader GetOne()
        {
            return this._loader;
        }
        #endregion
    }
}
