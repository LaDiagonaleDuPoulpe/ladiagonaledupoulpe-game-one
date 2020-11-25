using Godot;
using modelsplayer = ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers.Custom.Player
{
    /// <summary>
    /// Initializer of all data of the player
    /// </summary>
    public abstract class PlayerDataInitializer : BaseDataInitializer
    {
        #region Internal methods
        protected override void DoLoad()
        {
            PlayerCharacterDataSetting setting = new PlayerCharacterDataSetting();

            this.DefineSetting(setting);
            this.UpdateValuesOfPlayer(setting);

            this.IsLoaded = true;

            this.EmitSignal(LoadDataType.DataLoaded.ToString(), this, setting);
        }

        /// <summary>
        /// You must override this methode to set some values from setting
        /// </summary>
        /// <param name="setting">Setting is not null</param>
        protected abstract void DefineSetting(CharacterDataSetting setting);

        /// <summary>
        /// Updates all values of the current player
        /// </summary>
        /// <param name="setting"></param>
        protected virtual void UpdateValuesOfPlayer(PlayerCharacterDataSetting setting)
        {
            modelsplayer.Player player = this.GetNode<modelsplayer.Player>("/root/CurrentPlayer");
            player.InitializeData(setting);
        }
        #endregion
    }
}
