using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Characters;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers
{
    /// <summary>
    /// In memory data initializer for a player
    /// </summary>
    public class InMemoryPlayerDataInitializer : PlayerDataInitializer
    {
        #region Internal methods
        protected override void DefineSetting(CharacterDataSetting setting)
        {
            (setting as PlayerCharacterDataSetting).Hearts = new List<HeartHealthDataSetting>()
            {
                new HeartHealthDataSetting()
                {
                    CurrentValue = 100,
                    MaxValue = 100
                }
            };
        }
        #endregion
    }
}
