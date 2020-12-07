using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs.Player;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Customs.Player
{
    /// <summary>
    /// In memory data initializer for a player
    /// </summary>
    public class InMemoryPlayerDataInitializer : PlayerDataInitializer
    {
        #region Internal methods
        protected override void DefineSetting(CharacterDataSetting setting)
        {
            (setting as PlayerCharacterDataSetting).Health = new HeartHealthDataSetting()
            {
                CurrentValue = 100,
                MaxValue = 100
            };
        }
        #endregion
    }
}
