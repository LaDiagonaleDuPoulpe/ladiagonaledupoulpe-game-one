using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Games
{
    /// <summary>
    /// Uses this class to save and restore value
    /// </summary>
    public class CheckPoint : Node
    {
        #region Fields
        private CheckPointSetting _saveSetting = null;
        #endregion

        #region Constructors
        public CheckPoint(int id)
        {
            this.Id = id;
        }
        #endregion

        #region Public methods
        /// <summary>
        /// Saves data for the current check point
        /// </summary>
        /// <param name="setting"></param>
        public void Save(CheckPointSetting setting)
        {
            this._saveSetting = setting;
        }

        /// <summary>
        /// Restores the last check point values
        /// </summary>
        /// <param name="removeAfterRestore">True if we want to erase the check point data</param>
        /// <returns></returns>
        public CheckPointSetting Restore(bool removeAfterRestore = false)
        {
            CheckPointSetting setting = this._saveSetting;

            if (removeAfterRestore)
            {
                this._saveSetting = null;
            }

            return setting;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Id of the check point
        /// </summary>
        public int Id { get; private set; }
        #endregion
    }
}
